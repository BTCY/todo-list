/*
*  Store with TODO list data
*/

export interface ITodoStore {
    todoList: ITodoItem[],
    addTodo: (text: string) => void,
    complete: (item: ITodoItem) => void,
    incomplete: (item: ITodoItem) => void,
    delete: (item: ITodoItem) => void,
    edit: (item: ITodoItem) => void,
}

export interface ITodoItem {
    id: number,
    content: string,
    done: boolean,
    date: number,
}


export const createTodoStore = (): ITodoStore => {
    const todoListInLocalStorage: string | null = localStorage.getItem("todoList");
    return {
        todoList: !!todoListInLocalStorage ? JSON.parse(todoListInLocalStorage) : [],
        addTodo(text: string) {
            const todo: ITodoItem = {
                id: this.todoList.length + 1,
                content: text,
                done: false,
                date: +new Date()
            }
            this.todoList.push(todo)
        },
        complete(item: ITodoItem) {
            this.todoList = this.todoList.map(it => it.id === item.id ? { ...it, done: it.done = true } : it)
        },
        incomplete(item: ITodoItem) {
            this.todoList = this.todoList.map(it => it.id === item.id ? { ...it, done: it.done = false } : it)
        },
        delete(item: ITodoItem) {
            this.todoList = this.todoList.filter(it => it.id !== item.id)
        },
        edit(item: ITodoItem) {
            const index = this.todoList.findIndex(it => it.id === item.id);
            this.todoList[index] = item;
        }
    }
}