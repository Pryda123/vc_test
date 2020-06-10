export default {
    name: 'results-component',
    props: ['results', 'countOfRightAnswers', 'countOfQuestions'],
    data() {
        return {
            mainResult: null
        }
    },
    created() {
        for (let i=0; i<this.results.length; i++) {
            if(this.countOfRightAnswers == this.results[i].count) {
                this.mainResult = this.results[i];
                break;
            } else if(this.countOfRightAnswers < this.results[i].count) {
                this.mainResult = this.results[i];
                break;
            }
            
        }
    },
    methods: {
        tryAgain() {
            this.$emit('tryagain');
        }
    },
    computed: {

    },
    template: `
        <div>
            <span class="question-number">{{countOfRightAnswers}} из {{countOfQuestions}} правильных ответов</span>
            <h1 class="content-header results-header">{{mainResult.result}}</h1>
            <div class="social-buttons-wrap">
                <ShareNetwork
                    network="facebook"
                    url="https://vc.ru/"
                    :title="mainResult.result"
                    :description="mainResult.result"
                    class="content-btn social-fb"
                >
                    <img src="../img/icons/facebook.png">Поделится
                </ShareNetwork>
                <ShareNetwork
                    network="vk"
                    url="https://vc.ru/"
                    :title="mainResult.result"
                    :description="mainResult.result"
                    class="content-btn"
                >
                   <img src="../img/icons/vk.png">
                </ShareNetwork>
                <ShareNetwork
                    network="twitter"
                    url="https://vc.ru/"
                    :title="mainResult.result"
                    :description="mainResult.result"
                    class="content-btn"
                >
                    <img src="../img/icons/twitter.png">
                </ShareNetwork>
            </div>
            <div class="results-img"><img :src="mainResult.imgSrc" alt=""></div>
            <div class="content-footer"><button class="again-btn" @click="tryAgain">Пройти еще раз</button></div>
        </div>
    `
}