package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Role findByRoleid(int roleid);
	Role findByAuthority(String authority);
}
