package com.hj.phiau.service;

import com.hj.phiau.repository.entity.Node;

import java.util.List;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 14:10
 */
public interface INodeService {

    List<Node> findAll();

    void saveNode(Node node);

    void deleteNode(Node node);
}
