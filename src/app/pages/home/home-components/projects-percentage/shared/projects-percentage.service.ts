import {Injectable} from "@angular/core";
import {BaseService} from "../../../../../services/base.service";

@Injectable({
    providedIn: 'root',
})

export class ProjectsPercentageService extends BaseService {
    override key = 'api/project-status-percentage';
}
