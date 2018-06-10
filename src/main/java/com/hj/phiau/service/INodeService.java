package com.hj.phiau.service;

import com.hj.phiau.repository.entity.Node;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 14:10
 */
public interface INodeService {

    void saveNode(Node node);

    void deleteNode(Node node);
}
