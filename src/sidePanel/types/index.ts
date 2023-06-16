//  -----V2ex----
export interface V2exPost {
  node: V2exNode;
  member: Member;
  last_reply_by: string;
  last_touched: number;
  title: string;
  url: string;
  created: number;
  deleted: number;
  content: string;
  content_rendered: string;
  last_modified: number;
  replies: number;
  id: number;
}

export interface V2exNode {
  avatar_large: string;
  name: string;
  avatar_normal: string;
  title: string;
  url: string;
  topics: number;
  footer: string;
  header: string;
  title_alternative: string;
  avatar_mini: string;
  stars: number;
  aliases: any[];
  root: boolean;
  id: number;
  parent_node_name: string;
}

export interface Member {
  id: number;
  username: string;
  url: string;
  website: string;
  twitter: any;
  psn: any;
  github: any;
  btc: any;
  location: string;
  tagline: string;
  bio: string;
  avatar_mini: string;
  avatar_normal: string;
  avatar_large: string;
  created: number;
  last_modified: number;
}

// -----weibo-----

export interface WeiboPost {
  expand?: number;
  topic_flag: number;
  label_name?: string;
  extension?: number;
  star_name: any;
  subject_querys?: string;
  num: number;
  ad_info?: string;
  mid?: string;
  flag?: number;
  category?: string;
  raw_hot?: number;
  icon_desc?: string;
  subject_label?: string;
  icon_desc_color?: string;
  word: string;
  small_icon_desc?: string;
  small_icon_desc_color?: string;
  onboard_time?: number;
  is_hot?: number;
  star_word?: number;
  fun_word?: number;
  word_scheme?: string;
  note: string;
  emoticon: string;
  channel_type?: string;
  realpos?: number;
  rank: number;
  is_new?: number;
  flag_desc?: string;
  end_time?: number;
  topic_ad?: number;
  logo?: string;
  ad_type?: string;
  monitor?: Monitor;
  icon_type?: string;
  is_ad?: number;
  id?: number;
  pc_icon?: PcIcon;
  is_abtest?: number;
  icon?: string;
  mobile_icon_socialize?: MobileIconSocialize;
  name?: string;
  updated_time?: string;
  start_time?: number;
  poi?: number;
  dot_icon?: number;
  icon_width?: number;
  socialize_icon_width?: number;
  icon_height?: number;
  jump_scheme?: string;
  ad_channel?: number;
  mobile_icon?: MobileIcon;
  monitors?: Monitors;
  is_star?: number;
  sort?: number;
  is_topic?: number;
  nickname_show?: number;
}

export interface Monitor {}

export interface PcIcon {
  finder_desc_color: string;
  band_desc: string;
  band_desc_color: string;
  finder_desc: string;
}

export interface MobileIconSocialize {
  heigth: number;
  band_grey: string;
  band: string;
  width: number;
  finder_grey: string;
  finder: string;
}

export interface MobileIcon {
  finder_grey: string;
  band_grey: string;
  band: string;
  width: number;
  height: number;
  finder: string;
}

export interface Monitors {
  app: App[];
  pc: Pc[];
}

export interface App {
  third_party_click: string;
  type: string;
  third_party_show: string;
}

export interface Pc {
  pc_click: string;
  pc_show: string;
  type: string;
}
