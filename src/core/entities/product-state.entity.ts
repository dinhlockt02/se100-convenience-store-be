import { Entity } from './entity';

export class ProductItemStateEntity extends Entity {
  stateName: string;
  color: string;

  constructor(stateName: string, color: string) {
    super();
    this.stateName = stateName;
    this.color = color;
  }
}
