import {Injectable} from "@angular/core";
import {BaseService} from "../../../services/base.service";

@Injectable({
    providedIn: 'root',
})

export class UserService extends BaseService {
    override key = 'api/user';

    async register(item:object):Promise<any> {
        return this.http.post<any>(`${this.url}`,item).toPromise().catch((error) => {console.log(error)});
    }
}

