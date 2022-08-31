export interface Paginate<TModel = unknown> {
  _page?: number;
  _limit?: number;
  _sort?: keyof TModel;
  _order?: 'asc' | 'desc';
}
