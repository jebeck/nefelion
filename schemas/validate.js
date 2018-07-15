import _ from 'lodash';
import Ajv from 'ajv';
import metaSchema from 'ajv/lib/refs/json-schema-draft-04.json';

import definitions from './definitions.json';
import food from './food.json';

const SCHEMAS_BY_TYPE = {
  food,
};

const ajv = new Ajv({ meta: false, schemaId: 'id' });
ajv.addMetaSchema(metaSchema);
ajv._opts.defaultMeta = metaSchema.id;
ajv.addSchema(definitions);

export default function validate(datum) {
  const schema = SCHEMAS_BY_TYPE[datum.type];
  if (!schema) {
    throw new Error(`No schema for type ${datum.type}!`);
  } else {
    const validate = ajv.compile(SCHEMAS_BY_TYPE[datum.type]);

    const valid = validate(datum);

    if (valid) {
      return true;
    } else {
      validate.errors.forEach(error => {
        if (process.env.NODE_ENV !== 'test') {
          console.error(error);
        }
      });
      throw new Error('Validation failed!');
    }
  }
}
