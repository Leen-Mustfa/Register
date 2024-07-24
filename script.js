
    let students = [];

    class Student {
        constructor(id, name, status) {
            this.id = id;
            this.name = name;
            this.status = status;
        }
    }

    function addStudent(id, name, status) {
        if (!id || !name) {
            throw new Error("الرجاء ملئ هذا الحقل");
        }

        for (let student of students) {
            if (student.id === id) {
                throw new Error("رقم الطالب موجود بالفعل");
            }
        }

        let newStudent = new Student(id, name, status);
        students.push(newStudent);
        updateStudentsTable();
    }

    function removeStudent(id) {
        let indexToRemove = students.findIndex(student => student.id === id);
        if (indexToRemove === -1) {
            throw new Error("لا يمكن العثور على الطالب");
        }

        students.splice(indexToRemove, 1);
        updateStudentsTable();
    }

    function removeAllStudents() {
        students = [];
        updateStudentsTable();
    }

    function updateStudentsTable() {
        let tableBody = document.getElementById("studentsList");
        tableBody.innerHTML = ""; // تفريغ الجدول

        students.forEach(student => {
            let row = `<tr>
                           <td>${student.id}</td>
                           <td>${student.name}</td>
                           <td>${student.status}</td>
                           <td><button onclick="handleRemove(${student.id})">Remove</button></td>
                       </tr>`;
            tableBody.innerHTML += row;
        });
    }

    // معالجة تقديم النموذج لإضافة طالب جديد
    document.getElementById("addStudentForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let id = parseInt(document.getElementById("studentId").value);
        let name = document.getElementById("studentName").value;
        let status = document.getElementById("studentStatus").value;

        try {
            addStudent(id, name, status);
            document.getElementById("addStudentForm").reset();
        } catch (error) {
            alert("خطأ: " + error.message);
        }
    });

    function handleRemove(id) {
        try {
            removeStudent(id);
        } catch (error) {
            alert("خطأ: " + error.message);
        }
    }

    function toggleTable() {
        let table = document.getElementById("studentsTable");
        let btn = document.getElementById("toggleTableBtn");

        if (table.style.display === "none") {
            table.style.display = "table";
            btn.textContent = "Students privacy";
        } else {
            table.style.display = "none";
            btn.textContent = "Students Presentation";
        }
    }
