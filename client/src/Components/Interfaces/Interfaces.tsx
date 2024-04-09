export interface PasswordInterface {
  id : number,
  website : string,
  username : string,
  password : string,
}

export interface ReceivedPassword extends PasswordInterface {
  updated_at: Date;
  created_at: Date;
}

export interface PasswordDataInteface {
  currentPage : number,
  rowsPerPage : number,
  totalDataCount : number,
  filter : string,
  Arr : Array<ReceivedPassword>
}

export interface SharedPasswordInterface {
  id : number,
  sharedBy : string,
  website : string,
  username : string,
  accessAbleMembers : Array<number>,
  password : string,
}

export interface ReceivedSharedPassword extends SharedPasswordInterface {
  created_at : Date
}

export interface GlobalState {
  user : any,
  passwordData : PasswordDataInteface,
  accessToken : string | null,
  refreshToken? : string | null,
  loading : boolean,
  currentTab : string,
  setUser? : (user : any) => void,
  setPasswordData? : (passwordData : PasswordDataInteface) => void,
  setAccessToken? : (accessToken : string) => void,
  setTokens? : (accessToken : string, refreshToken : string) => void,
  setNotifications? : (notifications : String) => void,
  setCurrentTab? : (currentTab : string) => void
}