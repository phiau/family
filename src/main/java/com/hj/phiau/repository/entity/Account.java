package com.hj.phiau.repository.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 12:44
 */
@Getter
@Setter
@Entity
@Table (name = "t_u_account")
public class Account {
    @Id
    private int id;
    private String name, psw;
}
