package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao {
    private final EntityManager entityManager;

    public RoleDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public List<Role> getAllRoles() {
        return entityManager.createQuery("Select distinct r from User u join u.roles r", Role.class)
                .getResultList();
    }

    @Override
    public Role getRole(Long id) {
        return entityManager.find(Role.class, id);
    }

    @Override
    public List<Role> getRolesByIds(List<Long> roleIds) {
        return entityManager.createQuery("select r from Role r where r.id in :roleIds", Role.class)
                .setParameter("roleIds", roleIds).getResultList();
    }

    @Override
    public void saveRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    public void updateRole(Role role) {
        entityManager.merge(role);

    }

    @Override
    public void deleteRole(long id) {
        entityManager.createQuery("delete from Role where id = :roleId")
                .setParameter("roleId", id)
                .executeUpdate();
    }
}
