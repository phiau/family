package com.hj.phiau.service.impl;

import com.hj.phiau.repository.RootRepository;
import com.hj.phiau.repository.entity.Root;
import com.hj.phiau.service.IRootService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author zhenbiao.cai
 * @date 2018/6/10 14:14
 */
@Service
@Transactional
public class RootServiceImpl implements IRootService {

    @Autowired
    private RootRepository rootRepository;

    @Override
    public void saveRoot(Root root) {
        rootRepository.save(root);
    }

    @Override
    public void deleteRoot(Root root) {
        rootRepository.delete(root);
    }
}
