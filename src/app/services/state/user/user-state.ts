import { StateService } from "../state-service";
import { IUser } from "../../../models/iuser-user";
import { Observable } from "rxjs";

interface UsersState {
    users: IUser[];
    selectedUserId: number;
}

const initialState: UsersState = {
    users: [],
    selectedUserId: 0
};

export class UserStateService extends StateService<UsersState> {
    user: Observable<IUser[]> = this.select(state => state.users);

    selectedUser: Observable<IUser | undefined> = this.select((state) => {
        return state.users.find((user) => user.id === state.selectedUserId);
    })

    constructor() {
        super(initialState);
    }

    addUser(user: IUser) {
        this.setState({users: [...this.states.users, user]});
    }

    selectUser(user : IUser) {
        this.setState({ selectedUserId: user.id});
    }
}