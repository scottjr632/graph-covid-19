export interface DatasourceInterface {
  initializeData: () => Promise<DatasourceInterface>;
}
