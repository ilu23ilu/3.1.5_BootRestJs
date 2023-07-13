package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface RoleDao {
    List<Role> getAllRoles();

    Role getRole(Long id);
    List<Role> getRolesByIds(List<Long> roleIds);
    void saveRole(Role role);
    void updateRole(Role role);
    void deleteRole(long id);
}
