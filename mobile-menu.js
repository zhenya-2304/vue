//script menu in mobile version
class MobileMenu {
    constructor(classes) {  //classes - объект с классами объектов меню
        this.button = document.querySelector(classes.btnOpen);
        this.closeBtn = document.querySelector(classes.btnClose);
        this.menu = document.querySelector(classes.menu);
        this.activeClass = classes.activeClass;

        this.button.adventListener('click', this.addModificator);
        this.closeBtn.addEventListener('click', this.addModificator);
    }
    addModificator() {
        if (menu.classList.contains(this.activeClass)) {
            menu.classList.remove(this.activeClass);
            document.body.style.overflow = 'auto';
        } else {
            menu.classList.add(this.activeClass);
            document.body.style.overflow = 'hidden';
        }
    }


}

let ing = new MobileMenu({
    activeClass: 'active'
});
