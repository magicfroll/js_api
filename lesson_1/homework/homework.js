const initialJSON = '[{"id":1,"name":"Йога","time":"10:00 - 11:00","maxParticipants":15,"currentParticipants":15},{"id":2,"name":"Пилатес","time":"11:30 - 12:30","maxParticipants":10,"currentParticipants":5},{"id":3,"name":"Кроссфит","time":"13:00 - 14:00","maxParticipants":20,"currentParticipants":15},{"id":4,"name":"Танцы","time":"14:30 - 15:30","maxParticipants":12,"currentParticipants":10},{"id":5,"name":"Бокс","time":"16:00 - 17:00","maxParticipants":8,"currentParticipants":6}]';

const lsKey = 'lessons';

if(!localStorage.getItem(lsKey)) {
    localStorage.setItem(lsKey, initialJSON);
};

const lessons = JSON.parse(localStorage.getItem(lsKey));

function createLessonHTML(lesson) {        
    if (lesson.maxParticipants === lesson.currentParticipants) {
        singIn = 'disabled';
    } else {
        singIn = '';
    }    
    return `
    <tr class="lesson" id="${lesson.id}">
    <td>${lesson.name}</td>
    <td>${lesson.time}</td>
    <td>${lesson.maxParticipants}</td>
    <td class="currentParticipants">${lesson.currentParticipants}</td>
    <td><button id="singIn-btn" ${singIn}>Записаться</button></td>
    <td><button id="singOut-btn" disabled>Отменить запись</button></td>
    </tr>
    `
};

const schedule = document.querySelector('.schedule');

schedule.innerHTML += lessons.map(createLessonHTML).join('');

schedule.addEventListener('click', ({target}) => {
    const record = target.closest('.lesson')
    const lesson = lessons.find(lesson => lesson.id === +record.id);    
    if(target.closest('#singIn-btn')) {        
        if (lesson.currentParticipants < lesson.maxParticipants) {
            lesson.currentParticipants += 1;
            localStorage.setItem(lsKey, JSON.stringify(lessons));
            record.querySelector('.currentParticipants').textContent = lesson.currentParticipants;
            target.closest('#singIn-btn').setAttribute('disabled', true);
            record.querySelector('#singOut-btn').removeAttribute('disabled');
        }      
    } 
    else if (target.closest('#singOut-btn')) {        
        if (lesson.currentParticipants > 0) {
            lesson.currentParticipants -= 1;
            localStorage.setItem(lsKey, JSON.stringify(lessons));
            record.querySelector('.currentParticipants').textContent = lesson.currentParticipants;
            target.closest('#singOut-btn').setAttribute('disabled', true);
            record.querySelector('#singIn-btn').removeAttribute('disabled');            
        }
    }
})