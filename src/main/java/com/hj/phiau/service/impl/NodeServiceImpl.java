package com.hj.phiau.service.impl;

import com.hj.phiau.repository.NodeRepository;
import com.hj.phiau.repository.entity.Node;
import com.hj.phiau.service.INodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 14:12
 */
@Service
@Transactional
public class NodeServiceImpl implements INodeService {

    @Autowired
    private NodeRepository nodeRepository;

    @Override
    public void saveNode(Node node) {
        nodeRepository.save(node);
    }

    @Override
    public void deleteNode(Node node) {
        nodeRepository.delete(node);
    }
}
