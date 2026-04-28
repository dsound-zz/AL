import * as arrow from "apache-arrow";
import { match } from "ts-pattern";

export type QueryResultField = {
  name: string;
  dataType: "string" | "number" | "date";
};

export function arrowFieldToQueryResultField(
  field: arrow.Field<arrow.DataType>,
): QueryResultField {
  return {
    name: field.name,
    dataType: match(field.type.typeId)
      .with(arrow.Type.Date, arrow.Type.TimestampMillisecond, () => {
        return "date" as const;
      })
      .with(
        arrow.Type.Float,
        arrow.Type.Float16,
        arrow.Type.Float32,
        arrow.Type.Float64,
        arrow.Type.Int,
        arrow.Type.Int16,
        arrow.Type.Int32,
        arrow.Type.Int64,
        () => {
          return "number" as const;
        },
      )
      .otherwise(() => {
        return "string" as const;
      }),
  };
}

