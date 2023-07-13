package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.models.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();

    Role getRole(Long id);
    List<Role> getRolesByIds(List<Long> roleIds);
    void saveRole(Role role);
    void updateRole(Role role);
    void deleteRole(long id);
}
