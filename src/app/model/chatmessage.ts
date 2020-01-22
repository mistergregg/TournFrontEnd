export class ChatMessage {
  constructor(
    public id?: string,
    public fromId?: string,
    public toId?: string,
    public toUsername?: string,
    public fromUsername?: string,
    public message?: string) {}
}
