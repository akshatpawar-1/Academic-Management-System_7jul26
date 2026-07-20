function calculatePercentage(marks) {

    let total = 0;

    for (let i = 0; i < marks.length; i++) {

        total = total + marks[i];

    }

    const maximumMarks = marks.length * 100;

    const percentage = (total / maximumMarks) * 100;

    return percentage.toFixed(2);

}

export default calculatePercentage;