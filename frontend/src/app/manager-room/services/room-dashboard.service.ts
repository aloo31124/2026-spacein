import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomDashboardService {
    private DOMAIN = environment.domain;
    private CONTEXT = "/api/manager";
    private BASE_URL = this.DOMAIN + this.CONTEXT;
    //private BASE_URL = 'http://localhost:8082/api';

    // 編輯 教室
    room: any
    // 編輯 教室座位
    roomToSite: any;

    constructor(private http: HttpClient) {}

    setRoom(room:any) {
        this.room = room;
    }
    getRoom() {
        return this.room;
    }
    setSite(roomToSite:any) {
        this.roomToSite = roomToSite;
    }
    getSite() {
        return this.roomToSite;
    }

    importRoomToSite(ownerId:string, roomToSite: any) {
        return this.http.post<any>(`${this.BASE_URL}/room/site/import/${ownerId}`, roomToSite);
    }

    exportUserList(ownerId: string): Observable<any>  {
        return this.http.post<any>(`${this.BASE_URL}/room/booker/export/all/${ownerId}`, { user: {} });
    }

    searchUser(ownerId:string, data: any): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/booker/search/${ownerId}`, data);
    }

    exportRoom(ownerId:string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/export/all/${ownerId}`, { user: {} });
    }
    searchRoom(ownerId:string, room: any): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/search/${ownerId}`, room);
    }
    addRoom(ownerId:string, room: any): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/add/${ownerId}`, {room});
    }
    updateRoom(ownerId:string, room: any): Observable<any> {
        return this.http.patch<any>(`${this.BASE_URL}/room/update/${ownerId}`, {room});
    }
    deleteRoom(ownerId:string, id:string): Observable<any> {
        return this.http.delete<any>(`${this.BASE_URL}/room/delete/${ownerId}/${id}`);
    }

    exportSite(ownerId:string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/site/search/${ownerId}`, {roomToSite:{}});
    }
    searchSite(ownerId:string, data: any): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/site/search/${ownerId}`, data);
    }
    addSite(ownerId:string, roomToSite: any): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/site/add/${ownerId}`, {roomToSite});
    }
    updateSite(ownerId:string, roomToSite: any): Observable<any> {
        return this.http.patch<any>(`${this.BASE_URL}/room/site/update/${ownerId}`, {roomToSite});
    }
    deleteSite(ownerId:string, id:string): Observable<any> {
        return this.http.delete<any>(`${this.BASE_URL}/room/site/delete/${ownerId}/${id}`);
    }

    
    exportBooking(ownerId:string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/booking/search/${ownerId}`, {booking:{}});
    }
    searchBooking(ownerId:string, booking: any): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/room/booking/search/${ownerId}`, booking);
    }
}

