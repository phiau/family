package com.hj.phiau.repository.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 14:01
 */
@Getter
@Setter
@Entity
@Table(name = "t_u_node")
public class Node {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int xu;
    private int parent;
    private String name;
    private String info;
}
