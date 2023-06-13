import {Injectable} from "@angular/core";
import {BaseService} from "../../../services/base.service";

@Injectable({
    providedIn: 'root',
})

export class LeadService extends BaseService {
    override key = 'api/lead';
}
