export class ProjectModel {

    constructor(
        public id: number,
        public name: string,
        public lead_id: number,
        public lead_name: string,
        public lead_company: string,
        public notes: string,
        public value: number,
        public deadline: string,
        public status: string,
        public created_at: string
    ){}
}
