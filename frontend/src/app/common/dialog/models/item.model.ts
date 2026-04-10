export interface DialogItemModel {
    id: string,
    name: string,
    isDisabled?: boolean, // 是否反灰,不給點選
    [newProperty: string]: any,
}