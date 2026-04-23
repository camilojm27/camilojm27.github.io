---
title: 'Building a Docker management platform for my thesis'
description: 'How I designed and built a distributed Docker management system using Go, RabbitMQ, and Laravel for my undergraduate thesis.'
pubDate: '2024-06-01'
---

For my undergraduate thesis at Universidad del Valle, I built a platform that lets you manage Docker containers across multiple machines from a single interface. Here's what I learned.

## The problem

Managing Docker containers on a single machine is easy — you just run `docker ps`. But when you have several machines and want to orchestrate them centrally, things get complicated fast.

The university had this exact problem: several Linux servers running services as containers, with no unified way to see their state, start/stop them, or inspect logs.

## The architecture

I went with a message-based agent model:

- A **central API** (Laravel) that serves the web interface and stores state
- **Agents** (Go) running on each machine, listening on RabbitMQ queues
- The central API sends commands to agents via RabbitMQ; agents reply with status

The choice of RabbitMQ over direct HTTP calls was deliberate. Machines can go offline and come back — the queue holds the messages. Direct HTTP would just fail silently.

## Why Go for the agents

The agents needed to be small, fast, and easy to deploy on Linux servers. Go compiles to a single binary with no runtime dependencies. You drop it on the server, configure the RabbitMQ connection string, and it just works.

I also appreciated Go's concurrency model for this: each container gets its own goroutine for status polling, no threads to manage manually.

## What I'd do differently

The web interface was in Laravel Blade with a lot of JavaScript bolted on. If I were doing it today I'd reach for a proper frontend framework — the real-time status updates ended up being more complex than they needed to be.

I'd also write more tests for the agent. It had good coverage on the command parsing layer but the Docker client integration was mostly manual testing.

## Takeaways

Building something that actually runs on real hardware — not just a demo — forces you to think about failure modes you'd otherwise ignore. Machines restart. Networks partition. Queues fill up. Designing for that from the start made the system noticeably more robust.
