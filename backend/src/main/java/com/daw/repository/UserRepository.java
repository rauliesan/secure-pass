package com.daw.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmailAndPassword(String email, String password);

}
