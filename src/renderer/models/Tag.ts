type TagType = 'private' | 'public' | 'share';

export type Tag = {
  Id: Id;
  name: string;
  type: TagType;
  owner: Owner;
};
