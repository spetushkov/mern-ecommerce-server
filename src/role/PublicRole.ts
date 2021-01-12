import { ApiPermission } from '../permisssion/ApiPermission';
import { ApplicationRole } from './ApplicationRole';

export class PublicRole implements ApplicationRole {
  api: ApiPermission = {
    order: {
      findAll: false,
      findById: false,
      save: false,
      updateById: false,
      replaceById: false,
      deleteById: false,
    },
  };
}
