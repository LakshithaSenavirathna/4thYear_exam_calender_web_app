function calculateDaysRemaining(examDate) {
    const today = new Date('2025-08-22');
    const exam = new Date(examDate);
    const timeDiff = exam.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) {
        return "Exam Passed";
    } else if (daysDiff === 0) {
        return "Today!";
    } else if (daysDiff === 1) {
        return "1 day remaining";
    } else {
        return `${daysDiff} days remaining`;
    }
}

function calculateStudyDays() {
    const examSelect = document.getElementById('examSelect');
    const selectedValue = examSelect.value;
    const resultDiv = document.getElementById('studyResult');
    const resultDays = document.getElementById('resultDays');
    const resultText = document.getElementById('resultText');
    const resultDetails = document.getElementById('resultDetails');
    
    if (!selectedValue) {
        alert('Please select an exam first!');
        return;
    }
    
    const selectedDate = selectedValue.includes('-sta') ? selectedValue.substring(0, 10) : selectedValue;
    
    const today = new Date('2025-08-22');
    const examDate = new Date(selectedDate);
    const selectedOption = examSelect.options[examSelect.selectedIndex];
    const examName = selectedOption.text;
    
    const totalDays = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (totalDays <= 0) {
        resultDays.textContent = '0';
        resultText.textContent = 'This exam has already passed!';
        resultDetails.textContent = '';
        resultDiv.classList.add('show');
        return;
    }
    
    const examDates = [
        '2025-09-08', '2025-09-12', '2025-09-15', '2025-09-19', '2025-09-22',
        '2025-09-26', '2025-09-29', '2025-09-30', '2025-10-02'
    ];
    
    let studyDays = 0;
    const currentDate = new Date(today);
    
    while (currentDate < examDate) {
        const dayOfWeek = currentDate.getDay();
        const dateString = currentDate.toISOString().split('T')[0];
        
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            if (!examDates.includes(dateString) || dateString === selectedDate) {
                studyDays++;
            }
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (studyDays > 0) {
        studyDays--;
    }
    
    resultDays.textContent = studyDays;
    resultText.textContent = `free study days available for`;
    resultDetails.textContent = examName.split(' (')[0]; 
    
    resultDiv.classList.add('show');
}

function updateCountdowns() {
    const examDates = [
        { id: 'exam1-countdown', date: '2025-09-08' },
        { id: 'exam6-countdown', date: '2025-09-08' },
        { id: 'exam2-countdown', date: '2025-09-12' },
        { id: 'exam3-countdown', date: '2025-09-15' },
        { id: 'exam4-countdown', date: '2025-09-19' },
        { id: 'exam5-countdown', date: '2025-09-22' },
        { id: 'exam7-countdown', date: '2025-09-26' },
        { id: 'exam8-countdown', date: '2025-09-29' },
        { id: 'exam9-countdown', date: '2025-09-30' },
        { id: 'exam10-countdown', date: '2025-10-02' }
    ];

    examDates.forEach(exam => {
        const element = document.getElementById(exam.id);
        if (element) {
            element.textContent = calculateDaysRemaining(exam.date);
        }
    });
}

document.getElementById('examSelect').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateStudyDays();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    updateCountdowns();
    
    setInterval(updateCountdowns, 60000);
});
