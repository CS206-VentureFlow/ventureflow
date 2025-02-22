package com.example.venture;

import java.util.ArrayList;
import java.util.List;

import com.example.venture.model.*;
import com.example.venture.service.*;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class PopulateData {

    private final FundDataService fundDataService;
    private final FundService fundService;
    private final UserService userService;
    private final TopicService topicService;
    private final MessageService messageService;


    private void populateLP(int number) {
        for (int i = 0; i < number; i++) {
            LP lp = new LP("LP " + i,  "email" + i + "@xyz.com", "1234567890");
            userService.saveOrUpdateUser(lp);
        }
    }

    private void populateVC(int number) {
        for (int i = 0; i < number; i++) {
            VC vc = new VC("VC " + i,  "email" + i + "@xyz.com", "1234567890");
            userService.saveOrUpdateUser(vc);
        }
    }


    private void populateFund(int number, int numLP) {
        List<LP> lps = new ArrayList<>();
        lps.add((LP) userService.getUserById(2L));
        VC vc = (VC) userService.getUserById(1L);
        
        // Create fund for each VC with all LP a
        Fund fund = new Fund("Fund 0", lps, vc);
        fundService.saveFund(fund);
    }

    private void populateTopic(int fundID) {
        Fund fund = fundService.getFundById((long) fundID);
        Topic topic = new Topic("Topic 0", "VC 0", fund);
        topicService.saveOrUpdateTopic(topic);
    }

    private void populateMessage(int topicID) {
        Topic topic = topicService.getTopicById((long) topicID);
        Message message = new Message("Message 0", "VC 0", topic);
        messageService.saveOrUpdateMessage(message);
    }

    @EventListener(ContextRefreshedEvent.class)
    @Transactional
    public void populate() {
        int numFunds = 1;
        int numVC = 1;
        int numLP = 2;

        populateVC(numVC);
        populateLP(numLP);
        populateFund(numFunds, numLP);
        populateTopic(1);
        populateMessage(1);
    }
}
