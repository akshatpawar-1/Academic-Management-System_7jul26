function calculateGrade(percentage) {

    if (percentage >= 90)
        return "A+";

    else if (percentage >= 80)
        return "A";

    else if (percentage >= 70)
        return "B+";

    else if (percentage >= 60)
        return "B";

    else if (percentage >= 50)
        return "C";

    else if (percentage >= 40)
        return "D";

    else
        return "F";

}

export default calculateGrade;