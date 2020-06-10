export default {
    name: 'home',
    template: `
        <div class="content-container">
            <div class="content-wrap">
                <h1 class="content-header">Как хорошо вы разбираетесь в новостях бизнеса</h1>
                <p class="content-desc">По следам публикаций на vc.ru.</p>
                <span class="content-flag">Тест</span>
                <div class="content-footer">
                    <router-link to="/test" class="content-btn fz-20">Начать</router-link>
                </div>
                <div class="img-1"><img src="./img/screen1.png" alt=""></div>
                <div class="img-2"><img src="./img/screen2.png" alt=""></div>
                <div class="img-3"><img src="./img/money.png" alt=""></div>
            </div>
        </div>
    `
}