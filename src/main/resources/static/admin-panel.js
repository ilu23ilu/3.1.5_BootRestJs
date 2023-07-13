const url = 'http://localhost:8090/api/users/';

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadTable(data)
        })
}
function loadTable(listAllUsers) {
    let res = ``;
    for (let user of listAllUsers) {
        res +=
            `<tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td><input type="password" value="${user.password}" readonly></td>
                <td>${user.roles.map(r => r.name).join(', ')}</td>
                <td>
                    <button class="btn btn-sm btn-primary" type="button"
                    data-bs-toggle="modal" data-bs-target="#editModal"
                    onclick="editModal(${user.id})">Edit</button></td>
                <td>
                    <button class="btn btn-sm btn-danger" type="button"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                    onclick="deleteModal(${user.id})">Delete</button></td>
            </tr>`
    }
    document.getElementById('allUsersTable').innerHTML = res;
}

function newUserTab() {
    document.getElementById('newUserForm').addEventListener('submit', (e) => {
        e.preventDefault()
        let role = document.getElementById('rolesNew')
        let rolesAddUser = []
        for (let i = 0; i < role.options.length; i++) {
            if (role.options[i].selected) {
                rolesAddUser.push({id: role.options[i].value, name: role.options[i].innerHTML})
            }
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: document.getElementById('nameNew').value,
                lastName: document.getElementById('lastNameNew').value,
                email: document.getElementById('emailNew').value,
                password: document.getElementById('passwordNew').value,
                roles: rolesAddUser
            })
        })
            .then((response) => {
                if (response.ok) {
                    document.getElementById('nameNew').value = '';
                    document.getElementById('lastNameNew').value = '';
                    document.getElementById('emailNew').value = '';
                    document.getElementById('passwordNew').value = '';
                    document.getElementById('userTable-tab').click()
                    getAllUsers();
                }
            })
    })
}

function closeModal() {
    document.querySelectorAll(".btn-close").forEach((btn) => btn.click())
}


function editModal(id) {
    let editId = url + id;
    fetch(editId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('editId').value = user.id;
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPassword').value = user.password;
            document.getElementById('editRoles').value = user.roles.map(r => r.name).join(', ')
        })
    });

}


async function editUser() {
    let idValue = document.getElementById('editId').value;
    let firstNameValue = document.getElementById('editFirstName').value;
    let lastNameValue = document.getElementById('editLastName').value;
    let emailValue = document.getElementById('editEmail').value;
    let passwordValue = document.getElementById('editPassword').value;
    let role = document.getElementById('editRole')
    let listOfRole = []
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            listOfRole.push({id: role.options[i].value, name: role.options[i].innerHTML})
        }
    }
    let user = {
        id: idValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
        roles: listOfRole
    }
    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    closeModal()
    getAllUsers()
}


function deleteModal(id) {
    let delId = url + id;
    fetch(delId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('deleteId').value = user.id;
            document.getElementById('deleteFirstName').value = user.firstName;
            document.getElementById('deleteLastName').value = user.lastName;
            document.getElementById('deleteEmail').value = user.email;
            document.getElementById('deleteRoles').value = user.roles.map(r => r.name).join(', ')
        })
    });
}

async function deleteUser() {
    const id = document.getElementById('deleteId').value
    let urlDel = url + id;

    let method = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(urlDel, method).then(() => {
        closeModal()
        getAllUsers()
    })

}
function getUserPage() {
    let url2 = 'http://localhost:8090/api/users/user'
    fetch(url2).then(response => response.json()).then(user =>
        getInformationAboutUser(user))
}

function getInformationAboutUser(user) {
    user.roles.map(r => {
        if (r.name === 'ROLE_ADMIN') {
            getAllUsers()
            newUserTab()
        }
    })
    document.getElementById('userTableBody').innerHTML = `<tr>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(r => r.name).join(', ')}</td>
        </tr>`;

}
getUserPage();