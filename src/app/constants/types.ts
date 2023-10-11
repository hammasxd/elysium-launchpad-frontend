 export type NFTObject = {
    _id: string;
    NFTPoolAddress: string;
    NFTPoolType: string;
    NFTMaxCap: number;
    StartTime: number;
    EndTime: number;
    UnlockTime: number;
    Tiers: number;
    LPTokenName: string;
    LPTokenAddress: string;
    AmounttoLock: string;
    NFTName: string;
    NFTArtist: string;
    NFTImageURL: string;
    ProjectTitle: string;
    ProjectFacebook: string;
    ProjectInsta: string;
    ProjectTwitter: string;
    ProjectMedium: string;
    ProjectTelegram: string;
    ProjectYoutube: string;
    Purchased:string;
    Participants:string;
    FilledPercentage:number;
    ProjectDiscord: string;
    AboutProject: string;
    ProjectShortDesc: string;
    ProjectStatus: string;
    __v: number;
  };
  export type getUserIdpParticipatedType={
    success: boolean;
    data: Array<{
      exist: boolean;
      IDO: string;
    } & {
      total?: number;
      participatedIDO?: number;
    }>;
  };
  export type partiIdo = {
    participatedIDO:number,
    total:number
  }
  export type User = {
    success: boolean;
    response: {
      kycStatus: boolean;
      NFTParticipated: any[]; // You can replace "any[]" with the actual type if needed
      NFTLiked: any[]; // You can replace "any[]" with the actual type if needed
      _id: string;
      address: string;
      userName: string;
      tweeter: string;
      telegram: string;
      medium: string;
      stakingDays: number;
      stakeTime: number;
      stakeAmount: number;
      lastSnapShot: number;
      date: string;
      __v: number;
      tier: number;
    };
  }