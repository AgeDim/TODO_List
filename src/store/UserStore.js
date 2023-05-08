import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = true
        this._user = {email: 'dima@mail.ru', password: 'awawdawdawd'}
        this._lists = []
        this._selectedList = ""
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }


    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }


    get user() {
        return this._user
    }
    get lists(){
        return this._lists
    }

    get selectedList(){
        return this._selectedList
    }

    setLists(lists){
        this._lists = lists
    }

    setSelectedList(id){
        this._selectedList = id
    }
}