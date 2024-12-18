export const applyPagination = (documents: any, page: any, rowsPerPage: any) => {
    return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}