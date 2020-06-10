export default {
    name: 'questions-component',
    props: ['questions', 'results'],
    data() {
        return {
            countOfQuestions: 0,
            showAnswer: false,
            trueOrFalse: false,
            textAnswer: null,
            descAnswer: null,
            countOfRightAnswers: 0
        }
    },
    created() {
        if(localStorage.getItem('countOfQuestions')) {
            this.countOfQuestions = +localStorage.getItem('countOfQuestions');
            this.countOfRightAnswers = +localStorage.getItem('countOfRightAnswers');
        }
        if(localStorage.getItem('textAnswer')) {
            this.textAnswer = localStorage.getItem('textAnswer');
            this.descAnswer = localStorage.getItem('descAnswer');
        } // для возможности перезагрузки страницы пришлось использовать localstorage, чтобы не терялся прогресс, если это не требуется его полностью можно удалить
    },
    methods: {
        getAnswer(answer) {
            this.showAnswer = true;
            this.trueOrFalse = answer.trueOrFalse;
            this.textAnswer = answer.answer;
            this.descAnswer = answer.desc;
            if(answer.trueOrFalse) {
                this.countOfRightAnswers = this.countOfRightAnswers + 1;
                localStorage.setItem('countOfRightAnswers', this.countOfRightAnswers);
            }
            localStorage.setItem('textAnswer', this.textAnswer);
            localStorage.setItem('descAnswer', this.descAnswer);
        },
        nextAnswer() {
            this.showAnswer = false;
            this.trueOrFalse = false;
            this.textAnswer = null;
            this.descAnswer = null;
            this.countOfQuestions = this.countOfQuestions + 1;
            localStorage.setItem('countOfQuestions', this.countOfQuestions);

            localStorage.removeItem('textAnswer');
            localStorage.removeItem('descAnswer');
        },
        refreshAll() {
            this.countOfQuestions = 0;
            this.showAnswer = false;
            this.trueOrFalse = false;
            this.textAnswer = null;
            this.descAnswer = null;
            this.countOfRightAnswers = 0;

            localStorage.removeItem('countOfQuestions');
            localStorage.removeItem('countOfRightAnswers');
            localStorage.removeItem('textAnswer');
            localStorage.removeItem('descAnswer');
        }
    },
    template: `
            <div class="content-container">
                <div class="question-wrap">
                    <div v-if="countOfQuestions != questions.length">
                        <span class="question-number">{{countOfQuestions + 1}}/{{questions.length}}</span>
                        <h2 class="question-header">{{questions[countOfQuestions].question}}</h2>

                        <ul class="question-qnswers" v-if="!showAnswer">
                            <li v-for="answer in questions[countOfQuestions].answers" :key="answer.id"><button class="content-btn text-left" @click=getAnswer(answer)>{{answer.answer}}</button></li>
                        </ul>

                        <div v-if="showAnswer">
                            <div class="answer-wrap">
                                <div class="content-btn answer-block" :class="[trueOrFalse ? 'content-btn--green' : 'content-btn--red']">{{textAnswer}}</div>
                            </div>
                            <p class="answer-desc">
                                <span><b>{{trueOrFalse ? 'Верно. ' : 'Неверно. '}}</b></span>
                                {{descAnswer}}
                            </p>
                            <div class="content-footer">
                                <button class="next-btn" @click=nextAnswer>Продолжить</button>
                            </div>
                        </div>
                    </div>
                    <results-component v-if="countOfQuestions == questions.length" :results="results" :countOfQuestions="countOfQuestions" :countOfRightAnswers="countOfRightAnswers" v-on:tryagain="refreshAll"></results-component>
                </div>
            </div>
    `
}