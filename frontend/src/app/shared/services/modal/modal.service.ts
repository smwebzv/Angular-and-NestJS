import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from './modal.options';
@Injectable({
    providedIn: 'root',
})
export class ModalService {
    constructor(
        private ngbModal: NgbModal
    ) {}

    public openModal(
        component: any,
        options: ModalOptions,
        editData?: any,
        backdropClass?: string,
        keyboardEsc: boolean = true
    ) {
        options = {
            ...options,
            backdrop: 'static' as any,
            keyboard: keyboardEsc,
            backdropClass: backdropClass ? backdropClass : 'myDropback',
        };

        const modal = this.ngbModal.open(component, options);

        if (editData != null) {
            modal.componentInstance.editData = editData;
        }

        const instance = (modal as any)._windowCmptRef.instance;
        setTimeout(() => {
            instance.windowClass = 'modal-animation';
        });

        const fx = (modal as any)._removeModalElements.bind(modal);

        (modal as any)._removeModalElements = () => {
            instance.windowClass = '';
            setTimeout(fx, 100);
        };

        return modal;
    }
}
