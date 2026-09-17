import type { SchemaTypeDefinition } from 'sanity';
import { schemaTypes as cmsSchemaTypes } from '@prixtara/cms/schemas';

export const schemaTypes: SchemaTypeDefinition[] =
  cmsSchemaTypes as unknown as SchemaTypeDefinition[];
