
/**
 * WEBRTC SIGNALING & STREAMING ENGINE
 * 
 * This service manages the peer-to-peer lifecycle.
 * In production, 'db' refers to Firebase Realtime Database.
 */

export interface QualityMetrics {
  score: 'EXCELLENT' | 'GOOD' | 'POOR';
  jitter: number;
  packetLoss: number;
}

export class CallSession {
  private pc: RTCPeerConnection;
  private localStream: MediaStream | null = null;
  private onRemoteStream: (stream: MediaStream) => void;

  constructor(onRemoteStream: (stream: MediaStream) => void) {
    this.onRemoteStream = onRemoteStream;
    this.pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });

    this.pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        this.onRemoteStream(event.streams[0]);
      }
    };
  }

  async startLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      this.localStream.getTracks().forEach(track => {
        if (this.localStream) this.pc.addTrack(track, this.localStream);
      });
      return this.localStream;
    } catch (err) {
      console.error("Microphone access denied", err);
      throw err;
    }
  }

  async getQualityStats(): Promise<QualityMetrics> {
    const stats = await this.pc.getStats();
    let jitter = 0;
    let packetLoss = 0;
    let packetsReceived = 0;

    stats.forEach(report => {
      if (report.type === 'inbound-rtp' && report.kind === 'audio') {
        jitter = report.jitter || 0;
        packetLoss = report.packetsLost || 0;
        packetsReceived = report.packetsReceived || 0;
      }
    });

    const lossRate = packetsReceived > 0 ? packetLoss / (packetsReceived + packetLoss) : 0;
    
    let score: 'EXCELLENT' | 'GOOD' | 'POOR' = 'EXCELLENT';
    if (lossRate > 0.05 || jitter > 0.03) score = 'POOR';
    else if (lossRate > 0.01 || jitter > 0.01) score = 'GOOD';

    return { score, jitter, packetLoss: lossRate };
  }

  async createOffer() {
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    return offer; // This is then written to Firebase /calls/{id}/offer
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!this.pc.currentRemoteDescription) {
      await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  async createAnswer(offer: RTCSessionDescriptionInit) {
    await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return answer; // This is then written to Firebase /calls/{id}/answer
  }

  addIceCandidate(candidate: RTCIceCandidateInit) {
    this.pc.addIceCandidate(new RTCIceCandidate(candidate));
  }

  close() {
    this.localStream?.getTracks().forEach(t => t.stop());
    this.pc.close();
  }
}
