interface MessageFrom {
  readonly id?: number;
  readonly is_bot?: boolean;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly username?: string;
  readonly language_code?: string;
}

interface MessageChat {
  readonly id?: number;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly username?: string;
  readonly type?: string;
}

export interface TelegrafMessage {
  readonly message_id: number;
  readonly from?: MessageFrom;
  readonly chat?: MessageChat;
  readonly date?: number | Date;
  readonly text?: string;
}
