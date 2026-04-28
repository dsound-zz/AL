import { DatasetColumnRead } from "@/models/datasets/DatasetColumn";
import { OrderByDirection } from "./DataExplorerContext/types";
import { VizConfig } from "./VizSettingsForm/makeDefaultVizConfig";

export function serializeVizState({
  selectedFromDataSource,
  selectedColumns,
  selectedGroupByColumns,
  aggregations,
  orderByColumn,
  orderByDirection,
  vizConfig,
}: {
  selectedFromDataSource: string | undefined;
  selectedColumns: DatasetColumnRead[];
  selectedGroupByColumns: DatasetColumnRead[];
  aggregations: Record<string, string>;
  orderByColumn?: string;
  orderByDirection: OrderByDirection;
  vizConfig: VizConfig;
}): string {
  const state = {
    dataset: selectedFromDataSource,
    selectedColumns: selectedColumns.map((column) => {
      return "value" in column ? column.value : column;
    }),
    groupBy: selectedGroupByColumns.map((column) => {
      return "value" in column ? column.value : c;
    }),
    aggregations,
    orderByColumn,
    orderByDirection,
    vizConfig,
  };

  return encodeURIComponent(btoa(JSON.stringify(state)));
}
