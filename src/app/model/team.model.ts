
export interface TeamPlayer {
  userId?: string,
  userName?: string
}

export class Team {

  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public owner?: string,
    public ownerName?: string,
    public userList?: TeamPlayer[],
    public wins?: number,
    public looses?: number,
    public teamSize?: number,
    public userToken?: string){}
}
