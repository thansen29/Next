import { Task } from "./task.model";

export class List {
    constructor(public id: number, public title: string, public tasks: Task[]) {}
  }
  