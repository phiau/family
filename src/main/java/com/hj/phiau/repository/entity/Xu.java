package com.hj.phiau.repository.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 13:15
 */
@Getter
@Setter
@Entity
@Table(name = "t_u_xu")
public class Xu {
    @Id
    private int id;
    private String xu;
}
